import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

const removeBgImage = async (req, res) => {
    try {
        const { clerkId } = req.body

        const user = await userModel.findOne({ clerkId })

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if (user.creditsBalance === 0) {
            return res.json({ success: false, message: `No Credit Balance` });
        }

        const imagePath = req.file.path;
        const imageFile = fs.createReadStream(imagePath);

        const formData = new FormData();
        formData.append('image_file', imageFile);

        const { data } = await axios.post(
            'https://clipdrop-api.co/remove-background/v1',  // ✅ correct URL
            formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                    ...formData.getHeaders()  // ✅ required for FormData
                },
                responseType: 'arraybuffer',
            }
        )

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`  // ✅ clipdrop always returns png

        await userModel.findByIdAndUpdate(user._id, { creditsBalance: user.creditsBalance - 1 })  // ✅ only one deduction

        // ✅ delete uploaded file after processing
        fs.unlink(imagePath, () => {})

        res.json({ 
            success: true, 
            resultImage, 
            creditsBalance: user.creditsBalance - 1, 
            message: "Background removed successfully" 
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { removeBgImage }