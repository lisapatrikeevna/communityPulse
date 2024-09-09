import { Box, Paper } from "@mui/material";
import cl from "../category/category.module.scss";
import { CategoryType, useGetCategoryQuery } from "../../services/categoriesWrap/category.service.ts";


// CategoryList.tsx
const CategoryList = () => {
  // const {data}=useGetCategoryQuery()
  const { data, error, isLoading } = useGetCategoryQuery();


  console.log(data);
  console.log(JSON.stringify(data));
  let res=JSON.stringify(data)
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <>
    <Paper className={cl.wrapp}>
      <p>Category list </p>
      {data?.map((category:CategoryType) => (
        <Box key={category.id}>
          {category.id} : {category.name}
        </Box>
      ))}
      {/*<p>{res}</p>*/}
      {error && <p className={cl.error}>An error occurred while sending the Category.</p>}
    </Paper>
  </>

};

export default CategoryList;








