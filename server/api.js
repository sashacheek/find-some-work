const { response } = require("express");
const request = require("undici");

require("dotenv").config();
const apiKey = process.env.API_KEY;

const getData = async ({ jobTitle, sample_data }) => {
  // defaults
  const _limit = 20;
  let _page = 0;
  let _jobTitle = [];
  let _sample_data = true;

  // set user-inputted values
  if (jobTitle) {
    _jobTitle.push(jobTitle);
  }
  if (sample_data) {
    _sample_data = sample_data;
  }

  // api call to get job data
  const { statusCode, body } = await request.request(
    "https://api.theirstack.com/v1/jobs/search",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        blur_company_data: true,
        job_title_pattern_or: _jobTitle,
        page: _page,
        limit: _limit,
        job_country_code_or: ["US"],
        posted_at_max_age_days: 7,
      }),
    }
  );
  const responseBody = await body.text(); // Read the body as text
  const jsonResponse = JSON.parse(responseBody); // Parse the JSON response
  return jsonResponse;
};

module.exports = { getData };
