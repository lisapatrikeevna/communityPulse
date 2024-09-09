import { Box, CircularProgress, IconButton, Paper, Stack, Typography } from "@mui/material";
import cl from "../category/category.module.scss";
import { CategoryType, useGetCategoryQuery, useRemoveCategoryMutation } from "../../services/categoriesWrap/category.service.ts";
import DeleteIcon from '@mui/icons-material/Delete';


// CategoryList.tsx
const CategoryList = () => {
  // const {data}=useGetCategoryQuery()
  const {data, error, isLoading} = useGetCategoryQuery();
  const [deleteCat, {isLoading: isDeleting, isError: isDeleteError }] = useRemoveCategoryMutation()

  const removeCat = (id: number) => {
    deleteCat(id)
    .then((res) => {
      console.log("removeCat" ,res);
      console.log(`Категория с id ${id} удалена.`);
    })
    .catch(err => {
      console.error("Ошибка удаления категории:", err);
    });
  };

  // console.log(data);
  // console.log(JSON.stringify(data));
  // let res = JSON.stringify(data)
  if( isLoading ) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className={cl.error}>Ошибка при загрузке категорий.</p>;
  }


  return <>
    <Paper className={cl.wrapp}>
      <p>Category list </p>
      {isDeleting &&  <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>}
      {data?.map((category: CategoryType) => (<Stack direction="row" spacing={2} key={category.id}>
          <Typography> {category.id} : {category.name}     </Typography>
          <IconButton aria-label="delete" size="small" onClick={() => removeCat(category.id)}>
            <DeleteIcon fontSize="small"/>
          </IconButton>
        </Stack>))}
      {/*<p>{res}</p>*/}
      {/*{error && <p className={cl.error}>An error occurred while sending the Category.</p>}*/}
      {isDeleteError && <p className={cl.error}>Ошибка при удалении категории.</p>}
    </Paper>
  </>

};

export default CategoryList;








