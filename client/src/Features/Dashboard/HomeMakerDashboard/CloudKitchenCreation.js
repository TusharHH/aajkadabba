import { Outlet } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function CloudKitchenCreation() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();

    return (
        <>
            <div className="mt-3 d-flex flex-column mx-3 gap-5 container overflow-hidden">
                <h2>Create your Cloud Kitchen</h2>
                <form>
                    <div className="row-md-4 mt-1">
                        <label htmlFor="name" className="form-label"> Business Name:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''} custom-input input-width`}
                            id="name"
                            {...register('name', { required: true })}
                            required
                        />
                        {errors.name && <div className="invalid-feedback">Name is required</div>}
                    </div>
                    <div className="row-md-4 mt-1">
                      <label htmlFor="address" className="form-label">Address</label>
                      <textarea
                        type="text"
                        className={`form-control ${errors.description ? 'is-invalid' : ''} custom-input `}
                        id="description"
                        {...register('desccription', { required: true})}
                        required
                      />
                      {errors.description && <div className="invalid-feedback">Address must be at least 5 characters long</div>}
                    </div>
                    <div className='mt-5'>
                      <button className="fs-6 btn btn-custom px-4 w-100" type='submit'>
                        Create
                      </button>
                    </div>
                </form>
            </div>


            <Outlet />
        </>
    )
}