import React from 'react';
import Welcome from './CompleteProfile/Welcome';
import Gender from './CompleteProfile/Gender';
import { Grid, Container } from '@material-ui/core';
import SexualPreference from './CompleteProfile/SexualPreference';
import Interests from './CompleteProfile/Interests';
import ProfilePicture from './CompleteProfile/ProfilePicture';

export default function CompleteProfile(){
    // some code here
    return (
        <Container maxWidth={"md"}>
            <ProfilePicture />
        </Container>
    );
}