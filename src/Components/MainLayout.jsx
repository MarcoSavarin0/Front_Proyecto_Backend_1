import { Navbar } from './Navbar'
import { DashBoardLayout } from './DashBoardLayout'
// eslint-disable-next-line react/prop-types
export const MainLayout = ({ title, buttonText, children, onButtonClick }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Navbar />
            <DashBoardLayout title={title} buttonText={buttonText} onButtonClick={onButtonClick}>
                {children}
            </DashBoardLayout>
        </div>
    )
}
