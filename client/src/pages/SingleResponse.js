//view single (full) response to a form

function SingleResponse(){

    const { responseNum, formID } = useParams();

    const { loading, data } = useQuery(QUERY_RESPONSES, {
        variables: { formID: formID },
    });

    const form = data?.Form || {};

    if (loading) {
    return <div>Loading...</div>;
    }


    return(
        <div>
        {/*display a component that renders with a map*/}
        {/*the data.content and response[responseNum] of each piece in pieces[] */}
        </div>
    
    );
}

export default SingleResponse;