import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        //endpoints here --
        getTeams: builder.query({
            query: () => '/team',
        }),
        getTeam: builder.query({
            query: (id) => `/team/${id}`,
            providesTags: ['team'],
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
        updateTeam: builder.mutation({
            query: ({ id, data }) => ({
                url: `/team/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['team'],
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getTeams",
                            undefined,
                            (draft) => {
                                return draft.map(dt => {
                                    if (dt._id == id) {
                                        return { ...dt, teamMembers: result.data };
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
        updateTeamSupervisor: builder.mutation({
            query: ({ id, data }) => ({
                url: `/team/supervisor/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['team'],
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getTeams",
                            undefined,
                            (draft) => {
                                return draft.map(dt => {
                                    if (dt._id == id) {
                                        return { ...dt, supervisor: result.data };
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
        updateSupervisorReview: builder.mutation({
            query: ({ id, data }) => ({
                url: `/team/supervisor/status/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['team'],
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getTeams",
                            undefined,
                            (draft) => {
                                return draft.map(dt => {
                                    if (dt._id == id) {
                                        return { ...dt, review: result.data.review };
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
        getTeamMeet: builder.query({
            query: (id) => `/team/meet/${id}`,
            providesTags: ['team-meet'],
        }),
        addTeamMeet: builder.mutation({
            query: ({ id, data }) => ({
                url: `/team/meet/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['team-meet']
        }),
        deleteMeet: builder.mutation({
            query: (id) => ({
                url: `/team/meet/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['team-meet']
        }),
    })

});

export const { useAddNewTeamMutation, useGetTeamsQuery, useDeleteTeamMutation, useUpdateTeamMutation, useGetTeamQuery, useUpdateTeamSupervisorMutation, useUpdateSupervisorReviewMutation,useGetTeamMeetQuery,useAddTeamMeetMutation,useDeleteMeetMutation } = teamApi;