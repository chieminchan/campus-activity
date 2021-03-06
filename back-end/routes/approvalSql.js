const approval = {
    addApproval: (params) => {
        const {
            userId,
            name,
            type,
            brief,
            address,
            enrollDeadline,
            start,
            end,
            concator,
            concatorPhone,
            frontPoster,
            backPoster,
            addition
        } = params;
        return `insert into activities (activity_name, activity_brief, activity_creator_id, activity_enroll_deadline, activity_start, activity_end, activity_address, activity_type, activity_poster_front, activity_poster_back, activity_concat_phone, activity_concat_name, activity_addition, activity_approval_status) values ('${name}', '${brief}', ${userId}, '${enrollDeadline}', '${start}', '${end}', '${address}', '${type}', '${frontPoster}', '${backPoster}', '${concatorPhone}', '${concator}', '${addition}', 0)`;
    }
};

module.exports = approval;