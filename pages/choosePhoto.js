import React from "react";


function BuildFileSelector(){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector
}


function ChoosePhoto(){
    return (
        <div>
            <h1>Choose a photo</h1>
        </div>
    );
}