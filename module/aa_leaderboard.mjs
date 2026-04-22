var leaderBoardData = [
    {player: "Sravya Moparthi", highScore: 40},
    {player: "Silly Bob", highScore: 3},
    {player: "Player3", highScore: 9}
];

buildTable(leaderBoardDataAA);

function buildTable(data) {
    var table = document.getElementById('leaderboardTableAA');

    for(var i = 0; i < data.length; i++) {
        var row = '<tr>
            <td>${data[i].player}</td>
            <td>${data[i].highScore}</td>
        </tr>';

        table.innerHTML += row
    }
}