/* LOCALS */


import LoadingSpinner from './LoadingSpinner'


/* TYPES */


interface RendererWrapperProps {
    children: JSX.Element,
}


/* HELPERS */


const MessageWrapper = function({ children }: RendererWrapperProps) {
    return (
        <div className="flex flex-col items-center justify-center m-[50px]">
            {children}
        </div>
    )
}


/* MAIN */


export const ErrorMessage = function() {
    return (
        <MessageWrapper>
            <div className='text-size-default !text-red700 text-center'>Oh no something went wrong, please reload the page</div>
        </MessageWrapper>
    )
}

export const NoSearchFoundMessage = function() {
    return (
        <MessageWrapper>
            <div className='text-size-default !text-green500 text-center'>No result found</div>
        </MessageWrapper>
    )
}

export const LoadingMessage = function() {
    return (
        <MessageWrapper>
            <>
                <LoadingSpinner/>
                <div className='text-size-default mt-[15px]'>Data is loading</div>
            </>
        </MessageWrapper>
    )
}