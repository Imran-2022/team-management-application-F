import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        //endpoints here --
        getTeams: builder.query({
            query: () => '/team',
        }),
        getTeam: builder.query({
            query: (id) => `/team/${id}`,
        }),
        addNewTeam: builder.mutation({
            query: (data) => ({
                url: '/team',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    // start pessimistic way ->
                    if (result.data.teamName) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getTeams",
                                undefined,
                                (draft) => {
                                    draft.push(result.data);
                                }
                            )
                        )
                    }

                    // end pessimistic way ->

                } catch (err) {
                    // do nothing

                }
            },
        }),
        deleteTeam: builder.mutation({
            query: (id) => ({
                url: `/team/${id}`,
                method: "DELETE",
            }),

            async onQueryStarted(id, { queryFulfilled, dispatch }) {

                // Optimistic way start

                // deletedCount

                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getTeams',
                        undefined,
                        (draft) => {
                            return draft.filter(dt => dt._id != id)
                        }
                    )
                )
                try {
                    await queryFulfilled;
                } catch (err) {
                    patchResult.undo();
                }

                // Optimistic way end

            },
        }),
        updateTeam : builder.mutation({
            query: ({ id, data }) => ({
                url: `/team/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("result",);
                    // start pessimistic way ->

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getTeams",
                            undefined,
                            (draft) => {
                                return draft.map(dt => {
                                    if (dt._id == id) {
                                        return {...dt,teamMembers:result.data};
                                    }
                                    return dt;
                                })
                            }
                        )
                    )

                    // end pessimistic way ->

                } catch (err) {
                    // do nothing

                }
            },
        }),
    })

});

export const { useAddNewTeamMutation, useGetTeamsQuery,useDeleteTeamMutation,useUpdateTeamMutation,useGetTeamQuery } = teamApi;