import { Request, Response } from 'express';
import { searchPosts } from '../../src/controllers/search.controller';


interface Post {
    name: string;
    image: string;
    description: string;
    dateLastEdited: string;
}

// Mock the data module
jest.mock('../../src/data.json', () => [
  
  {
    name: 'Post 2',
    image: 'image1.jpg',
    description: 'This is the first post',
    dateLastEdited: '2023-07-25T04:59:13.759Z',
  },
  {
    name: 'Post 1',
    image: 'image1.jpg',
    description: 'This is the first post',
    dateLastEdited: '2023-07-26T04:59:13.759Z',
  },
  {
    name: 'Post 4',
    image: 'image4.jpg',
    description: 'This is the fourth post',
    dateLastEdited: '2023-07-27T04:59:13.759Z',
  },
  {
    name: 'Post 3',
    image: 'image3.jpg',
    description: 'This is the third post',
    dateLastEdited: '2023-07-28T04:59:13.759Z',
  }, 
  {
    name: 'The Lord of the Rings: The Return of the King',
    image: 'image1.jpg',
    description: 'Description for The Lord of the Rings: The Return of the King',
    dateLastEdited: '2023-07-29T04:59:13.759Z',
  },
  {
    name: 'The Lion King',
    image: 'image2.jpg',
    description: 'Description for The Lion King',
    dateLastEdited: '2023-07-30T04:59:13.759Z',
  },
  
  
]);


// Mock the data module
const data = [
    {
      name: 'Post 1',
      image: 'image1.jpg',
      description: 'This is the first post',
      dateLastEdited: '2023-07-30T04:59:13.759Z',
    },
    // Add more mock data if needed
];
  

// Define the mockRequest function
const mockRequest = (overrides?: any): Request => {
  const defaultReq = {
    query: {},
  };
  return { ...defaultReq, ...overrides } as Request;
};

// Define the mockResponse function
const mockResponse = (): Response => {
  const res: any = {};
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('searchPosts function', () => {
    it('should return all data when no search query provided', () => {
        const req = mockRequest({
          query: {
            page: 1,
            limit: 1,
          },
        }); // No search query provided
        const res = mockResponse();
    
        // Call the searchPosts function
        searchPosts(req, res);
    
        // Expect that the response JSON is called with all the data
        expect(res.json).toHaveBeenCalledWith({
          httpStatus: 200,
          body: {
            success: true,
            msg: 'Result successfully fetched',
            data: {
              results: [
                {
                  name: 'Post 2',
                  image: 'image1.jpg',
                  description: 'This is the first post',
                  dateLastEdited: '2023-07-25T04:59:13.759Z',
                }
              ],
              totalPages: 6,
            },
          },
        });
    });

    it('should return both posts when search term "the king" is provided', () => {
      const req = mockRequest({
        query: {
          query: 'the king',
        },
      });
      const res = mockResponse();
  
      // Call the searchPosts function
      searchPosts(req, res);
  
      // Expect that the response JSON is called with both posts
      expect(res.json).toHaveBeenCalledWith({
        httpStatus: 200,
        body: {
          success: true,
          msg: 'Result successfully fetched',
          data: {
            results: [
              {
                name: 'The Lord of the Rings: The Return of the King',
                image: 'image1.jpg',
                description: 'Description for The Lord of the Rings: The Return of the King',
                dateLastEdited: '2023-07-29T04:59:13.759Z',
              },
              {
                name: 'The Lion King',
                image: 'image2.jpg',
                description: 'Description for The Lion King',
                dateLastEdited: '2023-07-30T04:59:13.759Z',
              },
            ],
            totalPages: 1,
          },
        },
      });
    });
  
    it('should return only "The Lord of the Rings: The Return of the King" post when exact search term is provided', () => {
      const req = mockRequest({
        query: {
          query: '"the king"',
        },
      });
      const res = mockResponse();
  
      // Call the searchPosts function
      searchPosts(req, res);
  
      // Expect that the response JSON is called with the first post only
      expect(res.json).toHaveBeenCalledWith({
        httpStatus: 200,
        body: {
          success: true,
          msg: 'Result successfully fetched',
          data: {
            results: [
              {
                name: 'The Lord of the Rings: The Return of the King',
                image: 'image1.jpg',
                description: 'Description for The Lord of the Rings: The Return of the King',
                dateLastEdited: '2023-07-29T04:59:13.759Z',
              },
            ],
            totalPages: 1,
          },
        },
      });
    });

    it('should return results with exact search query provided in quotes', () => {
      const req = mockRequest({
        query: {
          query: '"Post 1"',
        },
      });
      const res = mockResponse();
    
      // Call the searchPosts function
      searchPosts(req, res);
    
      // Expect that the response JSON is called with the results containing "Post 1"
      expect(res.json).toHaveBeenCalledWith({
        httpStatus: 200,
        body: {
          success: true,
          msg: 'Result successfully fetched',
          data: {
            results: [
              {
                name: 'Post 1',
                image: 'image1.jpg',
                description: 'This is the first post',
                dateLastEdited: '2023-07-26T04:59:13.759Z',
              },
            ],
            totalPages: 1,
          },
        },
      });
    });

    it('should return data sorted by name in ascending order', () => {
      const req = mockRequest({
        query: {
          sortBy: 'name',
          page: 1,
          limit: 2,
        },
      });
      const res = mockResponse();
    
      // Call the searchPosts function
      searchPosts(req, res);
    
      // Expect that the response JSON is called with the data sorted by name in ascending order
      const sortedData = [...data].sort((a: Post, b: Post) => a.name.localeCompare(b.name));
      expect(res.json).toHaveBeenCalledWith({
        httpStatus: 200,
        body: {
          success: true,
          msg: 'Result successfully fetched',
          data: {
            results: [
              {
                name: 'Post 1',
                image: 'image1.jpg',
                description: 'This is the first post',
                dateLastEdited: '2023-07-26T04:59:13.759Z',
              },
              {
                name: 'Post 2',
                image: 'image1.jpg',
                description: 'This is the first post',
                dateLastEdited: '2023-07-25T04:59:13.759Z',
              },
            ],
            totalPages: 3, // considering 5 posts in total, and each page has 2 posts.
          },
        },
      });
    });
    
    it('should return data sorted by dateLastEdited in descending order', () => {
        const req = mockRequest({
          query: {
            sortBy: 'dateLastEdited',
            page: 1,
            limit: 2,
          },
        });
        const res = mockResponse();
      
        // Call the searchPosts function
        searchPosts(req, res);
      
        // Expect that the response JSON is called with the data sorted by dateLastEdited
        const sortedData = [...data].sort(
          (a: Post, b: Post) => new Date(b.dateLastEdited).getTime() - new Date(a.dateLastEdited).getTime()
        );
        expect(res.json).toHaveBeenCalledWith({
          httpStatus: 200,
          body: {
            success: true,
            msg: 'Result successfully fetched',
            data: {
              results: [
                {
                  name: 'The Lion King',
                  image: 'image2.jpg',
                  description: 'Description for The Lion King',
                  dateLastEdited: '2023-07-30T04:59:13.759Z',
                },
                {
                  name: 'The Lord of the Rings: The Return of the King',
                  image: 'image1.jpg',
                  description: 'Description for The Lord of the Rings: The Return of the King',
                  dateLastEdited: '2023-07-29T04:59:13.759Z',
                },          
              ],
              totalPages: 3,
            },
          },
        });
    });

    it('should return filtered and paginated results when a valid search query is provided', () => {
        const req = mockRequest({
        query: {
            query: 'post',
            sortBy: 'name',
            page: 1,
            limit: 2,
        },
        });
        const res = mockResponse();

        // Call the searchPosts function
        searchPosts(req, res);

        // Expect that the response JSON is called with the correct data
        expect(res.json).toHaveBeenCalledWith({
        httpStatus: 200,
        body: {
            success: true,
            msg: 'Result successfully fetched',
            data: {
            results: [
              {
                name: 'Post 1',
                image: 'image1.jpg',
                description: 'This is the first post',
                dateLastEdited: '2023-07-26T04:59:13.759Z',
              },
              {
                name: 'Post 2',
                image: 'image1.jpg',
                description: 'This is the first post',
                dateLastEdited: '2023-07-25T04:59:13.759Z',
              },
            ],
            totalPages: 2, // considering 4 posts with keyword 'post' in total, and each page has 2 posts.
            },
        },
        });
    });

   
    it('should return paginated results when page and limit values provided', () => {
      const req = mockRequest({
        query: {
          page: 2,
          limit: 2,
        },
      });
      const res = mockResponse();

      // Call the searchPosts function
      searchPosts(req, res);

      // Expect that the response JSON is called with the paginated data
      expect(res.json).toHaveBeenCalledWith({
        httpStatus: 200,
        body: {
          success: true,
          msg: 'Result successfully fetched',
          data: {
            results: [
              {
                name: 'Post 3',
                image: 'image3.jpg',
                description: 'This is the third post',
                dateLastEdited: '2023-07-28T04:59:13.759Z',
              },
              {
                name: 'Post 4',
                image: 'image4.jpg',
                description: 'This is the fourth post',
                dateLastEdited: '2023-07-27T04:59:13.759Z',
              }
            ],
            totalPages: 3, // considering 5 posts in total, and each page has 2 posts.
          },
        },
      });
    });
});
