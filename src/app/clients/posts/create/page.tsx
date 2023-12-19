import { PostsForm } from '@/components/Posts/PostsForm'

const Page = () => {
    // async function getPosts() {
    //     const postsCollection = collection(db, 'posts')
    //     const postSnapshot = await getDocs(postsCollection)
    //     const postList = postSnapshot.docs.map((doc) => doc.data())
    //     return postList
    // }

    // useEffect(() => {
    //     getPosts().then((posts) => {
    //         console.log(posts)
    //     })
    // }, [])

    // const upload = async () => {
    //     if (!file) alert('Please select a file')

    //     const fileRef = ref(storage, `newfiles/posts/${file?.[0].name}`)

    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     const uploadTask = uploadBytesResumable(fileRef, file![0])

    //     uploadTask.on(
    //         'state_changed',
    //         (snapshot) => {
    //             // Calculate the progress percentage
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //             setProgress(progress)
    //         },
    //         (error) => {
    //             console.log(error)
    //         },
    //         async () => {
    //             // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
    //             setFile(null)
    //             setProgress(0)
    //         },
    //     )
    // }

    return (
        <div className="w-full h-[90vh] flex justify-around items-center">
            <PostsForm />
        </div>
    )
}

export default Page
