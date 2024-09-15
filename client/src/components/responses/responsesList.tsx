import { IconButton, LinearProgress, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import UpdateModal from "./updateModal.tsx";
import { useGetResponseQuery, useRemoveResponseMutation, useUpdateResponseMutation,ResponseType } from "../../services/responseWrap/response.service.ts";


// responsesList.tsx
const ResponsesList = () => {
  const {data: responses, error, isLoading} =  useGetResponseQuery();
  const [deleteResponse, {isLoading: isDeleting, isError: isDeleteError}] = useRemoveResponseMutation()
  const [updateQuest, {isLoading: isUpdating, isError: updateErr}] = useUpdateResponseMutation()
  const [open, setOpen] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<null | ResponseType>(null);
  const handleOpen = (question: ResponseType) => {
    setOpen(true)
    setCurrentResponse(question)
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentResponse(null);
  }
  const removeResponse = (id: number) => {
    deleteResponse(id).then((res) => {
      console.log("res ", res);
    }).catch(err => console.log(err));
  }
  const handleUpdate = (body: ResponseType) => {
    updateQuest(body).then((res) => {
      console.log("res ", res);
    }).catch((err) => {
      err.log(err)
    })
  }


  console.log("responses", responses);

  return (<Paper>
    <Typography variant="h4">Responses list</Typography>
    <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
      {(isLoading || isDeleting) && <LinearProgress color="secondary"/>}
      {(isLoading || isUpdating) && <LinearProgress color="success"/>}
      {isLoading && <LinearProgress color="inherit"/>}
    </Stack>
    <List>
      {responses && responses.map((response: ResponseType) => (<ListItem key={response.id}>
        <Stack direction="row" spacing={2} key={response.id}>
          <ListItemText primary={[response.text, ` (id : ${response.id})`]}/>
        </Stack>
        <ListItemText primary={["category_id :", response.question_id]}/>
        <IconButton onClick={() => handleOpen(response)}>
          <EditIcon/>
        </IconButton>
        <IconButton aria-label="delete" size="small" onClick={() => removeResponse(response.id)}>
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </ListItem>))}
    </List>
    {error && <Paper>Error: {JSON.stringify(error)}</Paper>}
    {updateErr && <Paper>Error: {JSON.stringify(updateErr)}</Paper>}
    {isDeleteError && <Paper>Error: {JSON.stringify(isDeleteError)}</Paper>}

    {/*{currentResponse && <UpdateModal open={open} handleClose={handleClose} question={currentResponse} updateResponse={handleUpdate}/>}*/}

  </Paper>);
};

export default ResponsesList;





