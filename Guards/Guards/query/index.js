class QueryManager {
    Tasks = [];

    async init(ms) {
        while(true) {
            if(this.Tasks.length <= 0) {
              await new Promise(resolve => setTimeout(resolve, ms));
              continue;
            }
            let task = this.Tasks[0];
            await task();

            this.Tasks = this.Tasks.splice(1);
        }
    }

    query(handler) {
        this.Tasks.push(handler);
    }
}

module.exports = QueryManager;