module.exports = {
    createPostRules: {
        title: 'required|minLength:8|maxLength:500',
        content: 'required|minLength:10|maxLength:2000',
    },

    updatePostRules: {
        id: 'required',
    }
}