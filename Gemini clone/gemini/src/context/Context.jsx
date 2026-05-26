import { createContext, useState } from "react";
import model from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [resultData, setResultData] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [prevPrompts, setPrevPrompts] = useState([]);

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
    };

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            setPrevPrompts(prev => [...prev, prompt]);
            setRecentPrompt(prompt);
            response = await model.generateContent(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await model.generateContent(input);
        }

        try {
            const responseText = await response.response.text();

            let responseArray = responseText.split("**");
            let newArray = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newArray += responseArray[i];
                } else {
                    newArray += "<b>" + responseArray[i] + "</b>";
                }
            }
            let newArray2 = newArray.split("*").join("<br/>");
            let newArray3 = newArray2.split(" ");
            for (let i = 0; i < newArray3.length; i++) {
                const nextWord = newArray3[i];
                delayPara(i, nextWord + " ");
            }

        } catch (error) {
            setResultData("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        resultData,
        loading,
        onSent,
        showResult,
        setShowResult,
        prevPrompts,
        setPrevPrompts,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;