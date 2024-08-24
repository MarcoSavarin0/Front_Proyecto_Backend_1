import { Navbar } from './Navbar'
import { DashBoardLayout } from './DashBoardLayout'
import { SearchBar } from './SearchBar'
// eslint-disable-next-line react/prop-types
export const MainLayout = ({ title, buttonText, children, onButtonClick, onSearch }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Navbar />
            <DashBoardLayout title={title} buttonText={buttonText} onButtonClick={onButtonClick}>
                <SearchBar onSearch={onSearch} />
                {children}
            </DashBoardLayout>
        </div>
    )
}
