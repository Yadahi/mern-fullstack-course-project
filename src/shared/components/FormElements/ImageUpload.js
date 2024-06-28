import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

import "./ImageUpload.css";

// ImageUpload component is a reusable component that allows users to upload an image.
const ImageUpload = (props) => {
  // file state holds the current file that the user has selected.
  const [file, setFile] = useState();
  // previewUrl state holds the URL of the image that the user has selected.
  const [previewUrl, setPreviewUrl] = useState();
  // isValid state holds a boolean value that indicates whether the selected file is valid or not.
  const [isValid, setIsValid] = useState(false);

  // filePickerRef is a reference to the file input element that allows the user to select a file.
  const filePickerRef = useRef();

  // This useEffect hook is run whenever the file state changes.
  // It reads the file and sets the previewUrl state to the URL of the image.
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    // The onload event handler is called when the FileReader has finished reading the file.
    // It sets the previewUrl state to the result of the FileReader, which is the URL of the image.
    // The result is a data URL that represents the image.
    // The data URL is a string that consists of a prefix ("data:image/png;base64," for example),
    // followed by the base64-encoded image data.
    // The previewUrl state is used to display the image in the component.
    fileReader.onload = () => {
      // Set the previewUrl state to the result of the FileReader.
      // This will update the component and cause it to re-render with the new image.
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  // This function is called when the user clicks the "PICK IMAGE" button.
  // It prevents the default behavior of the click event and opens the file input element.
  const pickImageHandler = (event) => {
    event.preventDefault();
    filePickerRef.current.click();
  };

  // This function is called when the user selects a file.
  // It checks if a file was selected and sets the file, isValid, and calls the onInput function with the file information.
  const pickedHandler = (event) => {
    console.log(event);
    if (!event.target.files || event.target.files.length === 0) {
      setIsValid(false);
      return;
    }
    const fileIsValid = true;
    const pickedFile = event.target.files[0];
    setFile(pickedFile);
    setIsValid(true);
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  // This is the return statement for the ImageUpload component.
  // It renders a form control with a file input element, a preview of the selected image, and a button to select an image.
  // If the selected file is not valid, it also renders an error message.
  return (
    <div className="form-control">
      <input
        type="file"
        ref={filePickerRef}
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
