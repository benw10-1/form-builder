//view all abbreviated responses to a form (one line per response)

function Responses(){

    const { formID } = useParams();

    const { loading, data } = useQuery(QUERY_RESPONSES, {
        variables: { formID: formID },
    });

    const form = data?.Form || {};

    if (loading) {
    return <div>Loading...</div>;
    }


    return(
        <div>
        {/*display a component that renders with a map of maps*/}
        {/*the data.content of each piece in pieces[] as column titles */}
        {/*and the response[0 through response.length-1] of each piece in pieces in each column underneath the corresponding data.content */}
        {/*abbreviate the responses to make fit in a table*/}
        {/*each line is a link to that single response*/}
        </div>
    
    );
}

export default Responses;