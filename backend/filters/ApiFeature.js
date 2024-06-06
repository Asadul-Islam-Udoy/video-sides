class ApiFeatures{
     constructor(query,queryStr){
     this.query = query;
     this.queryStr = queryStr;
   
    }
    search(){
        const keywords = this.queryStr.keyword ? {
            $or:[{
            title:{
                $regex : this.queryStr.keyword,
                $options : 'i'
            }},
            {description:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }}
        ]
        }:{};
        this.query = this.query.find({...keywords});
        return this;
    }
    filter(){
        const queryCopy = ({...this.queryStr});
        const removeItem = ['keyword','page','limit']
        removeItem.forEach((key)=> delete queryCopy[key]);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }
    pagination(reqsultPage){
        const currentPage = Number(this.queryStr.page) || 1 ;
        const skip = reqsultPage * (currentPage - 1);
        this.query = this.query.limit(reqsultPage).skip(skip);
        return this;
    }

}
module.exports = ApiFeatures;