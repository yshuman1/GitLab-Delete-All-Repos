This is a very simple app designed to query your gitlab account for 20 repos at a time and loop through and delete them. The app will terminate once there are no more repos.

You need to prived two pieces of information your accesss token and user name. Find the lines below in the top of the code and edit them.

axios.defaults.headers.common["Private-Token"] = "put your token here";
const user = "put your user name here";

## Installation

`npm install @yshuman/gitlab-delete-all-repos`

## Usage

To run this program:

1.  Clone the repo
2.  from inside the repos directory run 'node index.js'
