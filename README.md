### Coding Assignment

Rules:
Usage of any libraries provided by the language or the framework used is restricted, except for the Mathematics and the I/O libraries.
Max time allowed: 24hours
Node.js is the preferred choice for implementation.

## Problem 1:
Problem Statement: A factory has a list of jobs to perform. Each job has a start time, end time, and profit value. The manager has asked his employee John to pick jobs of his choice. John wants to select jobs for him in such a way that would maximize his earnings.
Given a list of jobs, how many jobs and total earnings are left for other employees once John picks jobs of his choice.
Note: John can perform only one job at a time.

Input format:
Each Job has 3 pieces of info – Start Time, End Time, and Profit
The first line contains the number of Jobs for the day. Say ‘n’. So there will be ’3n' lines following as each job has 3 lines.
Each of the next ‘3n’ lines contains jobs in the following format:
start_time
end-time
Profit
start-time and end-time are in HHMM 24HRS format i.e. 9am is 0900 and 9PM is 2100

Constraints:
The number of jobs in the day is less than 100 i.e. 0<_n<_10
The start time is always less than the end, and Hours can go only up to 2359.

Output format:
The program should return an array of 2 integers where 1st one is the number of jobs left and the earnings of other employees.

Sample Input: 1
Enter the number of Jobs
3
Enter job start time, end time, and earnings
0900
1030
100
1000
1200
500
1100
1200
300
Sample Output: 1
The number of tasks and earnings available for others
Task: 2
Earnings: 400

Sample Input: 2
Enter the number of Jobs
3
Enter job start time, end time, and earnings
0900
1000
250
0945
1200
550
1130
1500
150
Sample Output: 2
The number of tasks and earnings available for others
Task: 2
Earnings: 400

Sample Input:3
Enter the number of Jobs
3
Enter job start time, end time, and earnings
0900
1030
100
1000
1200
100
1100
1200
100
Sample Output: 3
The number of tasks and earnings available for others
Task: 1
Earnings: 100


## Problem 2:
Let's say the HR team of a company has goodies set of size N each with a different price tag for each goodie. Now the HR team has to distribute the goodies among the M employees in the company such that one employee receives one goodie. Find out the goodies the HR team can distribute so that the difference between the low price goodie and the high price goodie selected is minimum.
Input:
Goodies and Prices:
Fitbit Plus: 7980
IPods: 22349
MI Band: 999
Cult Pass: 2799
Macbook Pro: 229900
Digital Camera: 11101
Alexa: 9999
Sandwich Toaster: 2195
Microwave Oven: 9800
Scale: 4999
Example Output
Number of the employees: 4
Here the goodies that are selected for distribution are:
Fitbit Plus: 7980
Microwave Oven: 9800
Alexa: 9999
Digital Camera: 11101
And the difference between the chosen goodie with highest price and the lowest price is 3121
Number of employees: 6
Here the goodies that are selected for distribution are:
Sandwich Toaster: 2195
Cult Pass: 2799
Scale: 4999
Fitbit Plus: 7980
Microwave Oven: 9800
Alexa: 9999
And the difference between the chosen goodie with highest price and the lowest price is 7804
Number of employees: 2
Here the goodies that are selected for distribution are:
Microwave Oven: 9800
Alexa: 9999
And the difference between the chosen goodie with highest price and the lowest price is 199
The input has to be read from a file. The input file contains all the goodies and their prices as shown in the example input file sample_input.txt.
The output has to be written to a file as shown in the example output file sample_output.txt.
