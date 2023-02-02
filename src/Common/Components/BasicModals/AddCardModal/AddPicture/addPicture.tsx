import React, {ChangeEvent, FC, useState} from 'react';
import {Button} from "@mui/material";
import {uploadImg} from "../../../InputTypeFile/InputTypeFile";
import {NewCardType} from "../../../../../Features/Main/MyPack/myPack";
import styleCard from "../addCardModal.module.css";


type AddPictureType = {
  onChange: (data: NewCardType) => void
}
export const AddPicture: FC<AddPictureType> = ({onChange}) => {

  const [questionImg, setQuestionImg] = useState<string>('')

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    uploadImg(e, setQuestionImg)

  }

  const handleButtonSubmit = () => {
    onChange({questionImg})
  }

  return (
    <div>
      <div>
        {questionImg &&
            <img src={questionImg} alt="image"/>
        }
        <label>
          <input type="file"
                 onChange={onChangeQuestion}
                 style={{display: 'none'}}
          />
          <Button variant="contained" component="span">
            Upload question
          </Button>
        </label>
      </div>
      <div className={styleCard.buttonBlock}>
        <Button sx={styleButton} onClick={handleButtonSubmit}>
          Save
        </Button>
      </div>
    </div>

  );
};


const styleButton = {
  display: 'flex',
  bgcolor: '#366EFF',
  color: 'white',
  borderRadius: 30,
  width: 111,
  height: 36,
  fontSize: 15,
  fontFamily: `'Montserrat', sans-serif`,
  textTransform: 'none',
  '&:hover': {
    color: '#366EFF',
  },
}
