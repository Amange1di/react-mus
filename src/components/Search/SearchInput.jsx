import { Container, TextField } from "@mui/material";
import { useContext } from "react";
import { AudioContext } from "../../context/AppContext";

const SearchInput = () => {
  const {setSearchText}=useContext(AudioContext)
  return (
    <div>
      <Container maxWidth="md">
        <TextField
        fullWidth
        onChange={(evt)=>{
         const text=evt.target.value
         setSearchText(text)
        }}
        sx={{mb:"10px"}}
        label="Search Music " variant="standard"
        >
          
        </TextField>
      </Container>
    </div>
  );
};

export default SearchInput;
