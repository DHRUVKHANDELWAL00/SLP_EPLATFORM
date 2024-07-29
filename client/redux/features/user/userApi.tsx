import {apiSlice} from '../api/apiSlice'


export const userApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        updateAvatar:builder.mutation({
            query:(avatar)=>({
                url:"updateUserAvatar",
                method:"PUT",
                body:{avatar},
                credentials: "include" as const,
            })
        })
        ,
        editProfile:builder.mutation({
            query:({name})=>({
                url:"updateUser",
                method:"PUT",
                body:{
                    name
                },
                credentials: "include" as const,
            })
        }),
        updatePassword:builder.mutation({
            query:({oldPassword,newPassword})=>({
                url:"updateUserPassword",
                method:"PUT",
                body:{
                    oldPassword,newPassword
                },
                credentials: "include" as const,
            })
        }),
        getAllUsers:builder.query({
            query:()=>({
                url:"getAllUsers",
                method:"GET",
                credentials: "include" as const,
            })
        }),
        // deleteUser:builder.mutation({
        //     query:(id)=>({
        //         url:`/delete-user/${id}`,
        //         method:"DELETE",
        //         body:{
        //             id,
        //         },
        //         credentials: "include" as const,
        //     })
        // }),
        updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user-role",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateUserCourse:builder.mutation({
      query: ({ email, courseId }) => ({
        url: "update-user-course",
        method: "PUT",
        body: { email, courseId },
        credentials: "include" as const,
      }),
    }),

    })
})
export const {useUpdateAvatarMutation,useEditProfileMutation,useUpdatePasswordMutation,useGetAllUsersQuery,useDeleteUserMutation,useUpdateUserRoleMutation,useUpdateUserCourseMutation}=userApi
