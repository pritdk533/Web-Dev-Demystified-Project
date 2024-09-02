export const BASE_URL = "https://clcpugaarvdzmkgflwba.supabase.co";
export const SIGN_UP_URL = BASE_URL + "/auth/v1/signup";
export const LOGOUT_URL = BASE_URL + "/auth/v1/logout";
export const LOGIN_URL = BASE_URL + "/auth/v1/token?grant_type=password";
export const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsY3B1Z2FhcnZkem1rZ2Zsd2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2NDgxNTYsImV4cCI6MjAzOTIyNDE1Nn0.QgCj4hTp4CexkQgfFu2SeNthNxnpt9mcOEok-tcz1qI";

// GET ALL COURSES
export const GET_ALL_COURSES = BASE_URL + "/rest/v1/courses?select=*";
export const REFRESH_TOKEN =
  BASE_URL + "/auth/v1/token?grant_type=refresh_token";

export const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51PniyS032thknd4jPjdv9qOb3iJtQbuxQcT2fwIZ4hHNXQg1r6m4UmURkeVpk1stu7KKfN04YR7nFZzkHrwmQxKJ00RKrPEq8i";
