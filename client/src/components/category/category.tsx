import { ChangeEvent, useState } from 'react';
import { Box, Button, Paper, TextField } from "@mui/material";
import cl from "../category/category.module.scss";
import SendIcon from "@mui/icons-material/Send";
import { useCreateCategoryMutation} from "../../services/categoriesWrap/category.service.ts";

const Category = () => {
  const [category, setCategory] = useState('');
  const [addCategory, {isLoading, isError }] = useCreateCategoryMutation()

  // const addNewCategory = async () => {
  //   try {
  //     // Вызовите функцию addCategory с переданными данными
  //     await addCategory({ text: Category });
  //     // Очистить вопрос после добавления
  //     // setCategory('');
  //   } catch (err) {
  //     console.error(`Error while adding Category: ${err}`);
  //   }
  // };
  const addNewCategory = async () => {
    try {
      console.log('Sending Category:', category); // Лог для проверки
      const response = await addCategory({ name: category }).unwrap()
      // if (response.statusCodes ) {
      //   console.log(response.status);
      //   // Очищаем информацию
      //   setCategory('');
      // }
      if (response.meta?.response?.status >= 200 && response.meta?.response?.status < 300) {
        console.log('Status code:', response.meta.response.status);
        // Очищаем информацию
        setCategory('');
      }
      console.log('Response from server:', response);
    } catch (err) {
      console.error(`Error while adding Category: ${err}`);  // Проверка наличия поля status
    }
  };

  return <>
    <Paper className={cl.wrapp}>
      <p>add Category </p>
      <Box className={cl.inputWrap}>
        <TextField
          className={cl.newCategory}
          required
          id="outlined-required"
          label="Required"
          value={category}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.currentTarget.value)}
        />
        <Button className={cl.addCategory} variant="outlined" startIcon={<SendIcon/>} disabled={isLoading} onClick={addNewCategory}>
          Send
        </Button>
      </Box>
      {isError && <p className={cl.error}>An error occurred while sending the Category.</p>}
    </Paper>
  </>

};

export default Category;