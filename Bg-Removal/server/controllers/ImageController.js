import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

const removeBgImage = async (req, res) => {
    try {
        const { clerkId } = req.body

        let user = await userModel.findOne({ clerkId })

        // Auto-create user if not found (webhook may not fire in local dev)
        if (!user) {
            user = await userModel.create({
                clerkId,
                email: `${clerkId}@placeholder.local`,
                creditBalance: 5,
            })
        }

        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: `No Credit Balance. Please purchase more credits.` });
        }

        const imagePath = req.file.path;
        const imageFile = fs.createReadStream(imagePath);

        const formData = new FormData();
        formData.append('image_file', imageFile);

        const { data } = await axios.post(
            'https://clipdrop-api.co/remove-background/v1',
            formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                    ...formData.getHeaders()
                },
                responseType: 'arraybuffer',
            }
        )

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`

        const newBalance = user.creditBalance - 1;
        await userModel.findByIdAndUpdate(user._id, { creditBalance: newBalance })

        // delete uploaded file after processing
        fs.unlink(imagePath, () => {})

        res.json({ 
            success: true, 
            resultImage, 
            creditsBalance: newBalance, 
            message: "Background removed successfully" 
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { removeBgImage }