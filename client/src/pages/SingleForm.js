//view and edit a form

function SingleForm(){

    const { formID } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_FORM, {
        variables: { formID: formID },
    });

    const form = data?.Form || {};

    if (loading) {
    return <div>Loading...</div>;
    }



    return(
    <div>

        <h1>This is the form currently displayed to respondents</h1>

        {/*use component with form as prop to display form.props[0 through form.props.length-1] */}
        {/*we could rename our prop field for clarity but that's not my hill*/}
        {/*once they click edit, we display a different component with the same form as prop*/}
        {/*the form props themselves (ah yes this name could de a pb) should maybe be a component also}

        {/*also*/}




        {/*delete button, asks for confirmation (make sure to handle stale links)*/}
        {/*NEED option to make respond link stale without deleting form and responses*/}
        {/*NEED option to use this form as a template to create another form with separate respond link*/}
        {/*edit button, allows editing and displays save buttons and warnings on hover for unreversable actions*/}
        {/*copy share link button */}

    </div>    
    );
}

export default SingleForm;