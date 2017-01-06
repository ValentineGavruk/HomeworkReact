var DataArticle = {
    title: 'Article',
    autor: 'Vasya',
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti" +
    " atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpaqui" +
    " officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio." +
    " Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, " +
    "omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus" +
    " saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut " +
    "reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
};

var Article = React.createClass({
    render: function () {
        return (
        <table>
            <tr>
                <th>Title</th>
                <th>Text</th>
                <th>Autor</th>
            </tr>
            <tr>
                <td>{DataArticle.title}</td>
                <td>{DataArticle.text}</td>
                <td>{DataArticle.autor}</td>
            </tr>
        </table>
        )
    }
});

ReactDOM.render(
    <Article/>,
    document.getElementById('content')
);