function timeToMinutes(time) {
    let hours = parseInt(time.slice(0, 2));
    let minutes = parseInt(time.slice(2));
    return hours * 60 + minutes;
  }
  
 
  function findLastNonConflict(jobs, index) {
    for (let i = index - 1; i >= 0; i--) {
      if (jobs[i].end <= jobs[index].start) {
        return i;
      }
    }
    return -1;
  }
  
  
  function maximizeProfit(jobsInput) {
   
    const jobs = jobsInput.map((job) => ({
      start: timeToMinutes(job.start_time),
      end: timeToMinutes(job.end_time),
      profit: job.profit,
    }));
  
    let n = jobs.length;
  
   
    jobs.sort((a, b) => a.end - b.end);
  
   
    let dp = Array(n).fill(0);
  
    
    dp[0] = jobs[0].profit;
  
  
    for (let i = 1; i < n; i++) {
     
      let inclProfit = jobs[i].profit;
 
      let l = findLastNonConflict(jobs, i);
      if (l != -1) {
        inclProfit += dp[l];
      }
  

      dp[i] = Math.max(inclProfit, dp[i - 1]);
    }
  
    let jobsSelected = [];
    let i = n - 1;
    while (i >= 0) {
      if (i == 0 || dp[i] != dp[i - 1]) {
        jobsSelected.push(i);
        i = findLastNonConflict(jobs, i);
      } else {
        i--;
      }
    }
  
    const totalEarnings = jobs.reduce((acc, job) => acc + job.profit, 0);
    const remainingJobs = jobs.filter((_, index) => !jobsSelected.includes(index));
    const remainingEarnings = remainingJobs.reduce((acc, job) => acc + job.profit, 0);
  
    return {
      tasks_for_others: remainingJobs.length,
      earnings_for_others: remainingEarnings,
    };
  }
  
  module.exports = { maximizeProfit };
  