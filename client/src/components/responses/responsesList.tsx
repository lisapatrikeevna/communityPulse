import { Box, IconButton, LinearProgress, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import UpdateModal from "./updateModal.tsx";
import { useGetResponseQuery, useRemoveResponseMutation, useUpdateResponseMutation, ResponseType, GetResponsesType, ResponseDetailType } from "../../services/responseWrap/response.service.ts";


// responsesList.tsx
const ResponsesList = () => {
  const {data: responses, error, isLoading} =  useGetResponseQuery();
  const [deleteResponse, {isLoading: isDeleting, isError: isDeleteError}] = useRemoveResponseMutation()
  const [updateQuest, {isLoading: isUpdating, isError: updateErr}] = useUpdateResponseMutation()
  const [open, setOpen] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<null | ResponseDetailType>(null);
  const handleOpen = (response: ResponseDetailType) => {
    setOpen(true)
    setCurrentResponse(response)
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
      {responses && responses.map((res: GetResponsesType) => (
        <ListItem key={res.question_id}>
          <ListItemText primary={`Agree Count: ${res.agree_count}`} />
          <ListItemText primary={`Disagree Count: ${res.disagree_count}`} />
          <List>
            {res.responses.map((response) => (
              <ListItem key={response.id}>
                <ListItemText primary={`(response id: ${response.id}) ${response.text}`} />
                <ListItemText primary={`is_agree: ${response.is_agree}`} />
                <Stack direction="row" spacing={2}>
                  <IconButton onClick={() => handleOpen(response)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={() => removeResponse(response.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
    {error && <Paper>Error: {JSON.stringify(error)}</Paper>}
    {updateErr && <Paper>Error: {JSON.stringify(updateErr)}</Paper>}
    {isDeleteError && <Paper>Error: {JSON.stringify(isDeleteError)}</Paper>}

    {/*{currentResponse && <UpdateModal open={open} handleClose={handleClose} question={currentResponse} updateResponse={handleUpdate}/>}*/}

  </Paper>);
};

export default ResponsesList;





