import mongoose from "mongoose";

const SalarySchema = new mongoose.Schema({
  work_year: Number,
  experience_level: String,
  employment_type: String,
  job_title: String,
  salary: Number,
  salary_currency: String,
  salary_in_usd: Number,
  employee_residence: String,
  remote_ratio: Number,
  company_location: String,
  company_size: String,
});

const Salary = mongoose.model("Salary", SalarySchema);
export default Salary;
