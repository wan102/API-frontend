import { Row, Col} from 'antd';
import BookmarkCard from '../common/bookmarkcard';
function BookmarksGrids({bookmarks, handleRemove}) { 
    return (
        <>
        <Row justify="center" gutter={[0, 24]}>
            {bookmarks.map((bookmark, index) => (
                <Col key={index} className="gutter-row" span={20}>
                    <BookmarkCard bookmark={bookmark} handleRemove={handleRemove}/>
                </Col>
            ))
            }
        </Row>
        </>
    );
}
export default BookmarksGrids;