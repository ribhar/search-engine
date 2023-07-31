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
    name: 'Post 1',
    image: 'image1.jpg',
    description: 'This is the first post',
    dateLastEdited: '2023-07-30',
  },
  // Add more mock data if needed
]);


// Mock the data module
const data = [
    {
      name: 'Post 1',
      image: 'image1.jpg',
      description: 'This is the first post',
      dateLastEdited: '2023-07-30',
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
        const req = mockRequest(); // No search query provided
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
                  name: 'Post 1',
                  image: 'image1.jpg',
                  description: 'This is the first post',
                  dateLastEdited: '2023-07-30',
                },
              ],
              totalPages: 1,
            },
          },
        });
    });

    it('should return all data when invalid page and limit values provided', () => {
        const req = mockRequest({
          query: {
            page: 1,
            limit: 10,
          },
        });
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
              results: data, // Since invalid page and limit, return all data
              totalPages: 1,
            },
          },
        });
    });
    
    it('should return data sorted by dateLastEdited in descending order', () => {
        const req = mockRequest({
          query: {
            sortBy: 'dateLastEdited',
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
              results: sortedData,
              totalPages: 1,
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
            limit: 1,
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
                dateLastEdited: '2023-07-30',
                },
            ],
            totalPages: 1,
            },
        },
        });
    });

    
});
