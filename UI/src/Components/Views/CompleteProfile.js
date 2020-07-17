import React, {useState} from 'react';
import Welcome from './CompleteProfile/Welcome';
import Gender from './CompleteProfile/Gender';
import {  Container } from '@material-ui/core';
import SexualPreference from './CompleteProfile/SexualPreference';
import Interests from './CompleteProfile/Interests';
import ProfilePicture from './CompleteProfile/ProfilePicture';

export default function CompleteProfile(props){

    const [formPage, setFormPage] = useState(0);
    const [gender, setGender] = useState(0)
    const [sexualPreferences, setSexualPreferences] = useState([])
    const [interests, setInterests] = useState([])
    const [profilePic, setProfilePic] = useState()

    const handleNext = () => {setFormPage(formPage + 1); handleSubmit()}
    const handleSubmit = () => {
        let data = { 
            'gender': gender,
            'sexualPreferences' : sexualPreferences,
            'interests': interests,
            'profilePic' : profilePic
        }
        console.log({data})
    }
    // some code here
    return (
        <Container maxWidth={"md"}>
        {
            formPage === 0 ? <Welcome next={handleNext} />
            : formPage === 1 ? <Gender next={handleNext} gender={gender} setGender={setGender}/>
            : formPage === 2 ? <SexualPreference next={handleNext} sexualPreferences={sexualPreferences} setSexualPreferences={setSexualPreferences}/>
            : formPage === 3 ? <Interests next={handleNext} interests={interests} setInterests={setInterests}/>
            : formPage === 4 ? <ProfilePicture next={handleSubmit} profilePic={profilePic} setProfilePic={setProfilePic}/>
            : <></>
        }
        </Container>



    );
}