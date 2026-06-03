import { Webhook } from 'svix'
import userModel from '../models/userModel.js'

const clerkWebhook = async (req, res) => {
    console.log('🔔 Webhook hit!')  // ✅ add
    console.log('Body type:', typeof req.body)  // ✅ add
    console.log('Body:', req.body)  // ✅ add
    console.log('Secret exists:', !!process.env.CLERK_WEBHOOK_SECRET)  // ✅ add

    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(req.body, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = JSON.parse(req.body)
        console.log('Event type:', type)  // ✅ add
        console.log('User data:', data)   // ✅ add

        switch (type) {
            case "user.created":
                await userModel.create({
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                })
                res.json({ success: true, message: "User created" })
                break

            case "user.updated":
                await userModel.findOneAndUpdate({ clerkId: data.id }, {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                })
                res.json({ success: true, message: "User updated" })
                break

            case "user.deleted":
                await userModel.findOneAndDelete({ clerkId: data.id })
                res.json({ success: true, message: "User deleted" })
                break

            default:
                res.json({ success: true })
                break
        }

    } catch (error) {
        console.log('❌ Webhook error:', error.message)  // ✅ add
        res.status(500).json({ success: false, message: error.message })
    }
}

export default clerkWebhook