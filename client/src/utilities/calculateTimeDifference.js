


const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
  
    const timeDifference = now - createdDate; // Difference in milliseconds
  
    if (timeDifference < 1000 * 60) {
      // Less than 1 minute
      const seconds = Math.floor(timeDifference / 1000);
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < 1000 * 60 * 60) {
      // Less than 1 hour
      const minutes = Math.floor(timeDifference / (1000 * 60));
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < 1000 * 60 * 60 * 24) {
      // Less than 1 day
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      // 1 day or more
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
};



export { calculateTimeDifference };