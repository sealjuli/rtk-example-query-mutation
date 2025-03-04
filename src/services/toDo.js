import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
};

export const toDoApi = createApi({
  reducerPath: "toDoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getToDos: builder.query({
      query: () => {
        return {
          url: `todos`,
          method: "GET",
          headers,
        };
      },
      onSuccess: (data) => console.log("Запрос успешен!", data),
      providesTags: ["Todos"],
    }),
    createToDo: builder.mutation({
      query: (body) => {
        return {
          url: `todos`,
          method: "POST",
          headers,
          body: body,
        };
      },
      invalidatesTags: ["Todos"],
    }),
    deleteToDo: builder.mutation({
      query: (id) => {
        return {
          url: `todos/${id}`,
          method: "DELETE",
          headers,
        };
      },
      invalidatesTags: ["Todos"],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    UpdateToDo: builder.mutation({
      query: ({ id, title }) => {
        return {
          url: `todos/${id}`,
          method: "PATCH",
          body: { title },
          headers,
        };
      },
      invalidatesTags: ["Todos"],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    CompleteToDo: builder.mutation({
      query: (id) => {
        return {
          url: `todos/${id}/isCompleted`,
          method: "PATCH",
          headers,
        };
      },
      invalidatesTags: ["Todos"],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
  }),
});

export const {
  useGetToDosQuery,
  useCreateToDoMutation,
  useDeleteToDoMutation,
  useUpdateToDoMutation,
  useCompleteToDoMutation,
} = toDoApi;
