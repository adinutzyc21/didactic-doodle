import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import { IconTypes } from '../types';

export function getIcon(iconName: IconTypes) {
    switch (iconName) {
        case IconTypes.recruiterName:
            return <PersonAddIcon />;
        case IconTypes.companyName:
            return <BusinessIcon />;
        default:
            return <PersonAddIcon />;
    }
}