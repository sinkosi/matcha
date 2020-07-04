import React, {useState} from 'react';
import Welcome from './CompleteProfile/Welcome';
import Gender from './CompleteProfile/Gender';
import {  Container } from '@material-ui/core';
import SexualPreference from './CompleteProfile/SexualPreference';
import Interests from './CompleteProfile/Interests';
import ProfilePicture from './CompleteProfile/ProfilePicture';

export default function CompleteProfile(){

    const [formPage, setFormPage] = useState(0);
    const handleNext = () => setFormPage(formPage + 1)
    // some code here
    return (
        <Container maxWidth={"md"}>
        {
            formPage === 0 ? <Welcome next={handleNext} />
            : formPage === 1 ? <Gender next={handleNext} />
            : formPage === 2 ? <SexualPreference next={handleNext} />
            : formPage === 3 ? <Interests next={handleNext} />
            : formPage === 4 ? <ProfilePicture next={handleNext} />
            : <></>
        }
        </Container>



    );
}