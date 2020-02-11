<Mutation mutation={saveMutation}>
  {(save, { data, error, loading, called }) => {
    if (error) {
      Alert.alert("Oops!", "Something went wrong saving.");
    }
    const res = data.response;
    if (res) {
      return (
        <Mutation
          mutation={submitMutation}
          onCompleted={this._onSubmitComplete}
          refetchQueries={this._refetchQueries}
          awaitRefetchQueries={true}
        >
          {(submit, { data, error, loading, called }) => {
            if (error) {
              Alert.alert("Oops!", "Something went wrong submitting.");
            }
            if (!called) {
              return (
                <Submit
                  submit={() => {
                    submit({ variables: { id: res.id } }); //this gets called on componentDidMount
                  }}
                />
              );
            }
            return null;
          }}
        </Mutation>
      );
    }
    return <Button loading={loading} title="SUBMIT" onPress={() => this._save(save)} />;
  }}
</Mutation>;
