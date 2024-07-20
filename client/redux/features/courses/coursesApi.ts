import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "createCourse",
                method: "POST",
                body: data,  // Directly using data instead of wrapping it in an object
                credentials: "include" as const,
            }),
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: "getAllCourse",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
    }),
});

export const { useCreateCourseMutation,useGetAllCoursesQuery } = courseApi;
