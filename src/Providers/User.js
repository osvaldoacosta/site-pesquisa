import React, { useState } from "react";

 
export const UserContext = React.createContext({});


const FIELD_NAMES = {
    FIRST_NAME: "username",
    ANSWER_ONE: "answerOne",
    RADIO: "radio",
    ANSWER_TWO: "answerTwo",
    IS_SERIES: "isSeries",
    IS_MUSIC: "isMusic",
    IS_OTHER: "isOther",

  };


export const UserProvider = ({children}) => {

    const [user, setUser] = useState({
        [FIELD_NAMES.FIRST_NAME]: '',
        [FIELD_NAMES.ANSWER_ONE]: '',
        [FIELD_NAMES.RADIO]: '',
        [FIELD_NAMES.ANSWER_TWO]: '',
        [FIELD_NAMES.IS_SERIES]: false,
        [FIELD_NAMES.IS_MUSIC]: false,
        [FIELD_NAMES.IS_OTHER]: false,

    });

    const insertType = target => {
        if(target.type === "checkbox"){
            return target.checked;
        }else{
            return target.value;
        }
    }

    const deleteField = () => {
        setUser({
            [FIELD_NAMES.FIRST_NAME]: '',
            [FIELD_NAMES.ANSWER_ONE]: '',
            [FIELD_NAMES.RADIO]: '',
            [FIELD_NAMES.ANSWER_TWO]: '',
            [FIELD_NAMES.IS_SERIES]: false,
            [FIELD_NAMES.IS_MUSIC]: false,
            [FIELD_NAMES.IS_OTHER]: false
        })
    }

    const insertField = fieldName => e => {
        let fieldValue = e.target;
        
        setUser(prevState => ({
            ...prevState,
            [fieldName]: insertType(fieldValue)
        }));
    };

    

    return (
        <UserContext.Provider value={{ user, insertField, FIELD_NAMES, deleteField}}>
            {children}
        </UserContext.Provider>



    )
}

