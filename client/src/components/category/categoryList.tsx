import { Box, CircularProgress, IconButton, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import cl from "../category/category.module.scss";
import { CategoryType, useGetCategoryQuery, useRemoveCategoryMutation, useUpdateCategoryMutation } from "../../services/categoriesWrap/category.service.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import UpdateModal from "./updateModal.tsx";


// CategoryList.tsx
const CategoryList = () => {
  const {data, error, isLoading} = useGetCategoryQuery();
  const [deleteCat, {isLoading: isDeleting, isError: isDeleteError}] = useRemoveCategoryMutation()
  const [updateCat, {isLoading: isUpdating, isError: updateErr}] = useUpdateCategoryMutation()
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<null | CategoryType>();
  const handleOpen = (question: CategoryType) => {
    setOpen(true)
    setCurrentQuestion(question)
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentQuestion(null);
  }
  const removeCat = (id: number) => {
    deleteCat(id)
    .then((res) => {
      console.log("removeCat", res);
    })
    .catch(err => {
      console.error("Ошибка удаления категории:", err);
    });
  };
  const handleUpdate = (body: CategoryType) => {
    updateCat(body).then((res) => {
      console.log("res ", res);
    }).catch((err) => {
      err.log(err)
    })
  }

  // console.log(JSON.stringify(data));
  if( isLoading ) {
    return <p>Loading...</p>;
  }

  if( error ) {
    return <p className={cl.error}>Ошибка при загрузке категорий.</p>;
  }


  return <>
    <Paper className={cl.wrapp}>
      <p>Category list </p>
      {isDeleting && <Box sx={{display: 'flex'}}> <CircularProgress/> </Box>}

      {data?.map((category: CategoryType) => (<Stack direction="row" spacing={2} key={category.id} sx={{justifyContent: "space-between", alignItems: "center", }}>
        <Typography> {category.id} : {category.name} </Typography>

        <Box sx={{justifyContent: "space-between", alignItems: "center", width: "30%"}}>
          <IconButton onClick={() => handleOpen(category)}>
            <EditIcon/>
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => removeCat(category.id)}>
            <DeleteIcon fontSize="small"/>
          </IconButton>
        </Box>
      </Stack>))}

      <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
        {error && <LinearProgress color="secondary"/> && <Paper>Error: {JSON.stringify(error)}</Paper>}
        {updateErr && <LinearProgress color="success"/> && <Paper>Error: {JSON.stringify(updateErr)}</Paper>}
        {isDeleteError && <LinearProgress color="inherit"/> && <Paper>Error: {JSON.stringify(isDeleteError)}</Paper>}
      </Stack>

      {currentQuestion && <UpdateModal open={open} handleClose={handleClose} category={currentQuestion} updateCategory={handleUpdate}/>}
    </Paper>
  </>

};

export default CategoryList;








