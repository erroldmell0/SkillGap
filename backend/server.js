require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/database')

const { resume, selfDescription, jobDescription } = require('./src/services/temp');
const { generateInterviewReport } = require('./src/services/ai.services');
generateInterviewReport({ resume, selfDescription, jobDescription })

connectToDB();

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});

