import { Request, Response } from 'express';
const data = require('../data.json');

interface Post {
  name: string;
  image: string;
  description: string;
  dateLastEdited: string;
}

export function searchPosts(req: Request, res: Response) {
  try{

    // Extract query parameters from the request
    const { query, sortBy} = req.query as unknown as { query: string, sortBy: string };
    let { page, limit } = req.query as unknown as { page: number, limit: number };
    
    let results: Post[] = [];

    if(!page){
      page = 1
    }
    if(!limit){
      limit = 6
    }

    if (query) {
      const queryStr = query.toLowerCase();
      const isExactMatch = queryStr.startsWith('"') && queryStr.endsWith('"');
      const searchTerms = isExactMatch ? [queryStr.substring(1, queryStr.length - 1)] : queryStr.split(" ");

      // Filter the data based on search query
      results = data.filter((post: Post) => {
        const postName = post.name.toLowerCase();
        const postDescription = post.description.toLowerCase();
        let isMatch = true;

        // Check if the search terms match the post name or description
        for (const term of searchTerms) {
          if (!(postName.includes(term) || postDescription.includes(term))) {
            isMatch = false;
            break;
          }
        }

        return isMatch;
      });
    } else {
      // If no search query, return all data
      results = data;
    }

    // Sort the results based on the sortBy parameter
    if (sortBy && sortBy.toLowerCase() === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy && sortBy.toLowerCase() === 'datelastedited') {
      results.sort((a, b) => new Date(b.dateLastEdited).getTime() - new Date(a.dateLastEdited).getTime());
    }

    // Apply pagination to the results
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = results.slice(startIndex, endIndex);
    const totalPages = Math.ceil(results.length / limit);

    // Send the paginated results and total pages as the response
    res.json({
      httpStatus: 200,
      body: {
        success: true,
        msg:'Result successfully fetched',
        data: {
          results: paginatedResults,
          totalPages: totalPages
        }
      }
    });
 } catch (error) {
    // Handle any errors that occurred during the execution
    console.error(error);
    res.json({
      httpStatus: 500,
      body: {
        success: false,
        msg:'An error occurred while searching posts.',
        data: null
      }
    });
  }
}
