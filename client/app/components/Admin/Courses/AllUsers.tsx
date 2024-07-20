import React from 'react'
import {DataGrid} from '@mui/x-data-grid';
import {Box,Button} from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiEdit2 } from 'react-icons/fi';
import Loader from '../../Loader/Loader';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
type Props = {}

const AllCourses = (props: Props) => {
    const {theme,setTheme}=useTheme();
const { data, isLoading, error } = useGetAllUsersQuery({});
    console.log(data);
    const columns=[
        {field:"id",headerName:"ID",flex:0.5},
        {field:"name",headerName:"Name",flex:1},
        {field:"email",headerName:"Email",flex:0.5},
        {field:"role",headerName:"Role",flex:0.5},
        {field:"courses",headerName:"Purchased",flex:0.5},

        {
            field:" ",
            headerName:"Delete",
            flex:0.2,
            renderCell:(params:any)=>{
                return(
                    <>
                    <Button>
                        <AiOutlineDelete size={20} className="dark:text-white text-black"/>

                    </Button>
                    </>
                )
            }
        }
    ];
    const rows:any=[];
    {
        data && data.users.forEach((item:any)=>{
            rows.push({
                id:item._id,
                name:item.name,
                email:item.email,
                role:item.role,
                courses:item.courses.length,
            })
        })
    }

  return (
    <div className='mt-[120px]'>
       {
        isLoading ? <Loader/> :(
            <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
          },
          "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-sortIcon": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-row": {
            color: theme === "dark" ? "#fff" : "#000",
            borderBottom:
              theme === "dark"
                ? "1px solid #ffffff30!important"
                : "1px solid #ccc!important",
          },
          "& .MuiTablePagination-root": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
            borderBottom: "none",
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
          },
          "& .MuiDataGrid-footerContainer": {
            color: theme === "dark" ? "#fff" : "#000",
            borderTop: "none",
            backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
          },
          "& .MuiCheckbox-root": {
            color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#fff !important",
          },
        }}
      >
        {/* The rest of the component JSX would go here */}
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </Box>
    </Box>
        )
       }
    </div>
  )
}

export default AllCourses