// 마이페이지 조회 api
export const getmypage = async () => {
try{
// console.log('마이페이지 try진입')
const response = await privateApi.get("/member");
return response.data;  
 }catch (error) {
console.error("error!", error);
}
};

// 전략 삭제
export const deleteTactic = async (id: number) => {
try{
const response = await privateApi.delete(`/tactic/${id}`)
console.log("res", response)
return response
}catch(error){
console.log('err', error)
}
}

// 내 자유게시글 조회
export const getmyfreeBoard = async () => {
const res = await privateApi.get(`/free-board`,{
params:{
sort: "createdAt",
page: 0,
size: 100,
keyword: "",
my: true,
like: false,
}
});
return res.data
};

export const deleteFollow = async (target: number | null) => {
try {
const response = await privateApi.delete(`/api/follow?target=${target}`);
console.log(response.data);
return response.data;
} catch (error) {
throw error;
}
};

export const postFollow = async (followerId: number | null) => {
try {
const response = await privateApi.post('/api/follow', {
followerId
});
console.log(response.data, "팔로우 성공");
return response.data;
} catch (error) {
throw error;
}
};
---------컴포넌트에서 API 사용할 때 ------------
useEffect(()=>{
console.log('selectedContest', selectedContest)
},[])
