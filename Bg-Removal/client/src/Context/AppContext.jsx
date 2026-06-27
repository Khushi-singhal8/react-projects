import { createContext, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [credit, setCredit] = useState(0);
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const { getToken } = useAuth();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();

    const loadUserCredits = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(
                `${backendUrl}/api/users/credits`,
                { headers: { token } }
            );
            if (data.success) {
                setCredit(data.credits);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load credits");
        }
    };

    const removeBg = async (imageFile) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }

            setImage(imageFile);  
            setResultImage(false);

            navigate('/result');

            const token = await getToken();

            const formData = new FormData();
            formData.append('image', imageFile);

            const { data } = await axios.post(
                `${backendUrl}/api/images/remove-bg`,
                formData,
                {
                    headers: {
                        token,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (data.success) {
                setResultImage(data.resultImage);
                setCredit(data.creditsBalance);
                if (data.creditsBalance === 0) {
                    navigate('/buy')
                }
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const value = {
        credit,
        setCredit,
        loadUserCredits,
        backendUrl,
        image,
        setImage,
        removeBg,
        resultImage,
        setResultImage,
        
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;