import aws from 'aws-sdk';
import _ from 'lodash';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

const USER_ADDED = 'USER_ADDED';
const s3Bucket = process.env.S3_BUCKET;

const formatErrors = (e, models) => {
    if (e instanceof models.sequelize.ValidationError) {
        return e.erros.map(x => _.pick(x, ['path', 'message']));
    }
    return [{ path: 'name', message: 'something went wrong'}];
};

export default {
    Subscription: {
        uesrAdded: {
            subscribe: ()=> pubsub.asyncIterator((USER_ADDED))
        }
    }
}